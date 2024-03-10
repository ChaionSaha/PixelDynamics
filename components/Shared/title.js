import React from 'react';
import Head from "next/head";

const Title = ({title}) => {
    return (
        <Head>
            <title>{`${title} | PixelDynamics`}</title>
        </Head>
    );
};

export default Title;