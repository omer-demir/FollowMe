function GetConfig() {
	return {
        'secret': 'fkngjwts_13',
		"database":"mongodb://localhost:27017/FollowMeDb",
		"port": process.env.PORT || 3000,
	};
}

module.exports = GetConfig();