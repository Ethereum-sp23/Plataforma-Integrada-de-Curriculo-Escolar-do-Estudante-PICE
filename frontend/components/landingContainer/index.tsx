import React from "react";

interface LandingContainerProps {
    children: React.ReactNode;
}

const LandingContainer = ({ children }: LandingContainerProps) => {
    return (
        <div className="h-[100vh] bg-landing bg-cover">
            <div className="h-full w-full lg:backdrop-blur-lg lg:p-20">
                <div className="lg:bg-white h-full w-full lg:rounded-2xl lg:p-4">
                    <div className="h-full w-full bg-landing bg-cover lg:rounded-2xl shadow overflow-hidden ">
                        <div className="h-full w-full bg-opacity-60 bg-black relative">{children}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingContainer;
