function GetConfig() {
	return {
		"database":"mongodb://192.168.0.22/FollowMeDb",
		"port": process.env.PORT || 3000,
	};
}

module.exports = GetConfig();