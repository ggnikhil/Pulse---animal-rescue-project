const reportModel = require("../models/report.model");
const scoutModel = require("../models/scout.model");
const uploadFiles = require("../services/storage.service");

async function createReportController(req, res) {
    try {
        const {
            animal_category,
            animal_type,
            injury_type,
            description,
            informer_lat,
            informer_lon
        } = req.body;

        if (!req.file) {
            return res.status(400).json({
                message: "Photo is required"
            });
        }

        if (!informer_lat || !informer_lon) {
            return res.status(400).json({
                message: "Location coordinates required"
            });
        }

        // Upload image
        const result = await uploadFiles(req.file.buffer);

        // Reverse Geocoding
        let location_name = "Unknown area";

        try {
            const geoUrl = `https://nominatim.openstreetmap.org/reverse?lat=${informer_lat}&lon=${informer_lon}&format=json`;

            const geoRes = await fetch(geoUrl, {
                headers: { "User-Agent": "pulse-app" }
            });

            if (geoRes.ok) {
                const geoData = await geoRes.json();

                if (geoData.address) {
                    location_name =
                        geoData.address.city ||
                        geoData.address.town ||
                        geoData.address.suburb ||
                        geoData.address.village ||
                        geoData.address.county ||
                        "Unknown area";
                }
            }

        } catch (err) {
            console.log("Reverse geocoding error:", err.message);
        }

        const report = await reportModel.create({
            animal_category,
            animal_type,
            injury_type,
            description,
            photo: result.url,
            informer_id: req.user.id,
            informer_lat,
            informer_lon,
            location_name
        });

        res.status(201).json({
            message: "Report created successfully",
            report
        });

    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
}

async function getReportsController(req, res) {
    try {
        let ngo_lat = null;
        let ngo_lon = null;

        if (req.user.role === 'scout') {
            const scout = await scoutModel.findById(req.user.id);
            if (!scout) {
                return res.status(404).json({ message: "Scout not found" });
            }
            ngo_lat = scout.ngo_lat;
            ngo_lon = scout.ngo_lon;
        }

        const reports = await reportModel
            .find()
            .populate("informer_id", "username contact")
            .populate("scout_id", "username")
            .sort({ createdAt: -1 });

        const formattedReports = await Promise.all(
            reports.map(async (report) => {

                let distance = "N/A";
                let duration = "N/A";

                if (ngo_lat && ngo_lon) {
                    try {
                        const url = `http://router.project-osrm.org/route/v1/driving/${ngo_lon},${ngo_lat};${report.informer_lon},${report.informer_lat}?overview=false`;
                        const osrmRes = await fetch(url);
                        if (osrmRes.ok) {
                            const osrmData = await osrmRes.json();
                            if (osrmData.routes?.length > 0) {
                                distance = (osrmData.routes[0].distance / 1000).toFixed(1);
                                const totalMinutes = Math.round(osrmData.routes[0].duration / 60);
                                if (totalMinutes < 60) {
                                    duration = `${totalMinutes} min`
                                } else {
                                    const hrs = Math.floor(totalMinutes / 60)
                                    const mins = totalMinutes % 60
                                    duration = mins > 0 ? `${hrs} hr ${mins} min` : `${hrs} hr`
                                }
                            }
                        }
                    } catch (err) {
                        console.log("OSRM Error:", err.message);
                    }
                }

                const now = new Date();
                const created = new Date(report.createdAt);
                const diffMs = now - created;
                const diffMinutes = Math.floor(diffMs / 60000);
                const diffHours = Math.floor(diffMs / 3600000);
                const diffDays = Math.floor(diffMs / 86400000);

                let timeAgo;
                if (diffMinutes < 1) {
                    timeAgo = "Just now";
                } else if (diffMinutes < 60) {
                    timeAgo = `${diffMinutes} min ago`;
                } else if (diffHours < 24) {
                    timeAgo = `${diffHours} hr ago`;
                } else {
                    timeAgo = `${diffDays} days ago`;
                }

                return {
                    _id: report._id,
                    animal_category: report.animal_category,
                    animal_type: report.animal_type,
                    injury_type: report.injury_type,
                    description: report.description,
                    photo: report.photo,
                    status: report.status,
                    location_name: report.location_name,
                    informer_lat: report.informer_lat,
                    informer_lon: report.informer_lon,
                    informer_name: report.informer_id?.username || "Unknown",
                    informer_contact: report.informer_id?.contact || "N/A",
                    scout_name: report.scout_id?.username || null,
                    distance: `${distance} km`,
                    duration: duration,
                    timeAgo
                };
            })
        );

        res.status(200).json({
            message: "All reports fetched successfully",
            reports: formattedReports
        });

    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
}

async function acceptReportController(req, res) {
    try {
        const { id } = req.params;

        const report = await reportModel.findById(id);

        if (!report) {
            return res.status(404).json({
                message: "Report not found"
            });
        }

        if (report.status !== "pending") {
            return res.status(400).json({
                message: "Report already accepted or resolved"
            });
        }

        report.status = "accepted";
        report.scout_id = req.user.id;

        await report.save();

        res.status(200).json({
            message: "Report accepted successfully",
            report
        });

    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
}

async function resolveReportController(req, res) {
    try {
        const { id } = req.params;

        const report = await reportModel.findById(id);

        if (!report) {
            return res.status(404).json({
                message: "Report not found"
            });
        }

        if (report.status !== "accepted") {
            return res.status(400).json({
                message: "Only accepted reports can be resolved"
            });
        }

        if (!report.scout_id || report.scout_id.toString() !== req.user.id) {
            return res.status(403).json({
                message: "You are not assigned to this report"
            });
        }

        await reportModel.findByIdAndDelete(id)  // 👈 save ki jagah delete

        res.status(200).json({
            message: "Report resolved and deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
}

async function getMyReportsController(req, res) {
    try {
        const reports = await reportModel
            .find({ informer_id: req.user.id })
            .sort({ createdAt: -1 });

        const formattedReports = reports.map((report) => {
            const now = new Date();
            const created = new Date(report.createdAt);
            const diffMs = now - created;

            const diffMinutes = Math.floor(diffMs / 60000);
            const diffHours = Math.floor(diffMs / 3600000);
            const diffDays = Math.floor(diffMs / 86400000);

            let timeAgo;
            if (diffMinutes < 1) {
                timeAgo = "Just now";
            } else if (diffMinutes < 60) {
                timeAgo = `${diffMinutes} min ago`;
            } else if (diffHours < 24) {
                timeAgo = `${diffHours} hr ago`;
            } else {
                timeAgo = `${diffDays} days ago`;
            }

            return {
                _id: report._id,
                animal_category: report.animal_category,
                animal_type: report.animal_type,
                injury_type: report.injury_type,
                description: report.description,
                photo: report.photo,
                status: report.status,
                location_name: report.location_name,
                timeAgo
            }
        })

        res.status(200).json({
            message: "My reports fetched successfully",
            reports: formattedReports
        });

    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
}

module.exports = {
    createReportController,
    getReportsController,
    getMyReportsController,  
    acceptReportController,
    resolveReportController
};
