function GetConfig() {
	return {
        'secret': 'fkngjwts_13',
		"database":"mongodb://192.168.0.22/FollowMeDb",
		"port": process.env.PORT || 3000,
	};
}

module.exports = GetConfig();