import React, {Fragment, useState} from "react";
import {useMutation, useQuery} from "@apollo/react-hooks";
import {Link, useHistory, useLocation} from 'react-router-dom'
import gql from "graphql-tag";
import Grid from "@material-ui/core/Grid";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CircularProgress, Hidden,
    Link as MuiLink,
    TextField,
    Typography, useMediaQuery, useTheme
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import CardMedia from "@material-ui/core/CardMedia";
import Icon from "@material-ui/core/Icon";

import "../styles/sass/auth.sass"

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

const VERIFY = gql`
    {
        verify
    }
`;

const LOGIN = gql`
    mutation login($email: String! $password: String!) {
        login(email: $email, password: $password)
    }
`;

const useQueryParam = () => {
    return new URLSearchParams(useLocation().search);
};

const Login = () => {
    const classes = useStyles();

    const theme = useTheme();
    const match = useMediaQuery(theme.breakpoints.down('xs'));

    // setting the states
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [verified, setVerified] = useState(null);

    const query = useQueryParam();
    const redirect = query.get('redirect') || '/';
    const history = useHistory();

    const {loading, error, data} = useQuery(VERIFY, {
        onCompleted(verified) {
            setVerified(verified);
            window.location.assign(redirect);
        }
    });


    const [login] = useMutation(LOGIN, {
        onCompleted(result) {
            setVerified(true);
            window.location.assign(redirect);
        },

        onError(error) {
            console.log(error);
            setVerified(false)
        }
    });

    const signUpButton =
        <MuiLink to={`/signup/?redirect=${redirect !== "/" && redirect}`} component={Link} underline={"none"}>
            <Button color={"secondary"} variant={"contained"}>
                Sign up
            </Button>
        </MuiLink>;


    return (
        <Fragment>
            {loading ? <CircularProgress/> :

                <Card>
                    <Grid container direction={"row"}>
                        <Hidden xsDown>
                            <Grid item
                                  direction={"column"}
                                  justify={"center"}
                                  alignItems={"center"}
                                  container
                                  xs={6}
                                  className={"welcome"}
                            >
                                <CardMedia>
                                    <Grid
                                        item
                                        align={"center"}
                                    >
                                        <Typography variant={"h4"}>
                                            Welcome
                                        </Typography>
                                        <Typography variant={"body1"}>
                                            Sign in to access
                                        </Typography>
                                        <Typography>
                                            or
                                        </Typography>

                                    </Grid>
                                    <Grid item align={"center"}>
                                        {
                                            signUpButton
                                        }
                                    </Grid>

                                </CardMedia>
                            </Grid>
                        </Hidden>
                        <Grid item
                              direction={"column"}
                              justify={"center"}
                              alignItems={"center"}
                              container
                              xs={match ? 12 : 6}
                        >
                            <form
                                onSubmit={e => {
                                    e.preventDefault();

                                    login({
                                        variables: {
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
                                    <Grid align={"center"}>
                                        <Typography variant={"h5"}>
                                            Sign in
                                        </Typography>
                                        <Hidden smUp>
                                            <Typography variant={"h5"} className={classes.cardTitle}>Or</Typography>
                                                {signUpButton}
                                        </Hidden>
                                    </Grid>


                                    <TextField
                                        label={"Email address"}
                                        value={email}
                                        type={"email"}
                                        onChange={(e) => {
                                            setEmail(e.target.value)
                                        }}
                                    />

                                    <TextField
                                        label={"Password"}
                                        value={password}
                                        type={"password"}
                                        onChange={(e) => {
                                            setPassword(e.target.value)
                                        }}
                                    />
                                    <Grid item
                                          direction={"row"}
                                          container
                                          justify={"flex-end"}
                                          style={{marginTop: 16}}
                                    >

                                        <MuiLink
                                            to={"/forgotPassword"}
                                            component={Link}
                                            underline={"none"}
                                            color={"secondary"}
                                        >
                                            Forgot password?
                                        </MuiLink>

                                    </Grid>

                                </CardContent>
                                <CardActions>
                                    <Button color="primary" variant="contained" type={"submit"}
                                            endIcon={<Icon>send</Icon>}>Sign in</Button>
                                </CardActions>
                            </form>
                        </Grid>
                    </Grid>

                </Card>
            }
        </Fragment>
    )
};

export default Login;