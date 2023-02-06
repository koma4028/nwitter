import React from "react";

const Auth = () => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const onChange = (event) => {
        const {target: {name, value}} = event;
        //const {name, value} = {event.target.name, event.target.value};
        if (name === "email") setEmail(value);
        else if (name === "password") setPassword(value);
    };
    const onSubmit = (event) => {
        event.preventDefault();
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    name="email"
                    type="text"
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
                <input type="submit" value="Login" />
            </form>
            <div>
                <button>Continue with Google</button>
                <button>Continue with GitHub</button>
            </div>
        </div>
    );
};

export default Auth;