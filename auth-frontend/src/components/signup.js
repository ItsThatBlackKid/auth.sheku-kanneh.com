import React, {Fragment, useState} from "react";
import {useMutation} from "@apollo/react-hooks";
import gql from "graphql-tag";
import "../styles/sass/auth.sass"
import {
    Button,
    Card,
    CardActions,
    CardContent, CircularProgress,
    Grid,
    Hidden,
    Icon,
    Link as MuiLink,
    Slide,
    TextField, useMediaQuery, useTheme
} from '@material-ui/core'
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import {Link, useLocation} from "react-router-dom";
import CardMedia from "@material-ui/core/CardMedia";
import {green} from "@material-ui/core/colors";

const SIGNUP = gql`
    mutation signup($first_name: String $last_name: String $email: String! $password: String!) {
        signup(input: {first_name: $first_name, last_name: $last_name, email: $email, password: $password})
    }
`;

const useStyles = makeStyles(theme => ({


    textWidth: {
        '& .MuiFormControl-root': {
            width: "100%"
        }
    },

    cardTitle: {
        textAlign: "center"
    },

}));


const useQueryParam = () => {
    return new URLSearchParams(useLocation().search);
};

export default function SignUp() {
    document.title = "Auth - Sign up";
    const classes = useStyles();
    // setting the states
    const theme = useTheme();
    const match = useMediaQuery(theme.breakpoints.down('xs'));

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [validPass, setValidPass] = useState(null);
    const [message, setMessage] = useState({
        message: "",
        error: false
    });

    const query = useQueryParam();
    const redirect = query.get('redirect') || '/';

    const [signup] = useMutation(SIGNUP, {
        onCompleted(result) {
            setMessage({
                message: "Sign up successful",
                error: false
            })
        },

        onError(error) {
            console.log(error);
            setMessage({
                message: error.message,
                error: true
            })
        }
    });

    const passwordsMatch = (toMatch) => {
        setValidPass(toMatch === password);

        setPassword2(toMatch);
    };

    const signinButton =
        <MuiLink to={`/login/?redirect=${redirect !== "/" && redirect}`} component={Link} underline={"none"}>
            <Button color={"primary"} variant={"contained"}>
                Sign in
            </Button>
        </MuiLink>;

    return (
        <Fragment>
            <Card>
                <Grid container direction={"row"}>
                    <Grid
                        item
                        direction={"column"}
                        justify={"center"}
                        alignItems={"center"}
                        container
                        xs={match ? 12 : 6}
                    >
                        <form
                            onSubmit={e => {
                                e.preventDefault();

                                if (!validPass) {
                                    return false;
                                }

                                signup({
                                    variables: {
                                        first_name: firstName,
                                        last_name: lastName,
                                        email,
                                        password
                                    }
                                }).catch(e => {
                                    console.log(e);
                                })
                            }}
                            id={"cred-form"}
                        >
                            <CardContent>
                                <Typography variant={"h4"} className={classes.cardTitle}>Sign up</Typography>
                                <Hidden smUp>
                                    <Typography variant={"h4"} className={classes.cardTitle}>Or</Typography>
                                    <Grid item align={"center"}>
                                        {signinButton}
                                    </Grid>
                                </Hidden>


                                <TextField
                                    label={"First name"}
                                    value={firstName}
                                    onChange={(e) => {
                                        setFirstName(e.target.value)
                                    }}
                                />

                                <TextField
                                    label={"Last name"}
                                    value={lastName}
                                    onChange={(e) => {
                                        setLastName(e.target.value)
                                    }}
                                />

                                <TextField
                                    required
                                    label={"Email address"}
                                    value={email}
                                    type={"email"}
                                    onChange={(e) => {
                                        setEmail(e.target.value)
                                    }}
                                />

                                <TextField
                                    required
                                    label={"Password"}
                                    value={password}
                                    type={"password"}
                                    error={ validPass != null && !validPass}
                                    helperText={validPass != null && !validPass && "Passwords do not match"}
                                    onChange={(e) => {
                                        setPassword(e.target.value)
                                    }}/>
                                <TextField
                                    label={"Confirm password"}
                                    value={password2}
                                    error={ validPass != null && !validPass}
                                    helperText={validPass != null && !validPass && "Passwords do not match"}
                                    type={"password"}
                                    onChange={(e) => {
                                        passwordsMatch(e.target.value)
                                    }}
                                />

                                <Grid align="center">
                                    {
                                        message.message !== "" &&
                                        <Typography variant={"body2"} color={message.error ? "error" : "textPrimary"} style={ !message.error && {color: green[500]}}>
                                            {message.message}
                                        </Typography>
                                    }

                                </Grid>

                            </CardContent>

                            <CardActions>
                                <div style={{position: 'relative'}}>

                                    <Button
                                        color="secondary"
                                        variant="contained"
                                        type={"submit"}
                                        endIcon={<Icon>send</Icon>}
                                    >
                                        Submit
                                    </Button>
                                </div>
                            </CardActions>

                        </form>
                    </Grid>
                    <Hidden xsDown>
                        <Grid
                            item
                            direction={"column"}
                            justify={"center"}
                            alignItems={"center"}
                            container
                            xs={6}
                            className={"welcome"}>
                            <CardContent>
                                <Grid
                                    item
                                    align={"center"}
                                >
                                    <Typography variant="h4">
                                        Welcome
                                    </Typography>

                                    <Typography>
                                        Sign up for access
                                    </Typography>

                                    <Typography>
                                        Or
                                    </Typography>
                                </Grid>

                                <Grid item align={"center"}>
                                    {signinButton}
                                </Grid>


                            </CardContent>
                        </Grid>
                    </Hidden>

                </Grid>
            </Card>

        </Fragment>
    )
}