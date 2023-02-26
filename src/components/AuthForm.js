import React from "react";

const AuthForm = () => {
    return(
        <React.Fragment>
            <form onSubmit={onSubmit}>
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={onChange}
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={onChange}
                />
                <input type="submit" value={newAccount ? "Create Account" : "Sign In"} />
            </form>
            {error}
            <span onClick={toggleNewAccount}>{newAccount ? "Sign In" : "Create Account"}</span>
        </React.Fragment>
    );
};

export default AuthForm;