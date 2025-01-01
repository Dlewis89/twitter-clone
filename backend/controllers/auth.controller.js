const register = async (req, res) => {
    res.json({
        data: "register endpoint"
    });
}

const login = async (req, res) => {
    res.json({
        data: "login endpoint"
    });
}

const logout = async (req, res) => {
    res.json({
        data: "logout endpoint"
    });
}

export {
    register,
    login,
    logout
}