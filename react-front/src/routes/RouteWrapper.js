const { useContext } = require("react");
const { ServerDataContext } = require("../components/context/data.context");

export function RouteWrapWithData(Component) {
    function ComponentWithDataProp(props) {
        const { serverData } = useContext(ServerDataContext)
        return (
            <Component
                {...serverData}
            />
        );
    }

    return ComponentWithDataProp;
}

export function RouteAdminWrapWithPateintsData(Component) {
    function ComponentWithDataProp(props) {
        const { serverData } = useContext(ServerDataContext)
        if (serverData) {
            const patients = serverData.patients
            return (
                <Component
                    patients={patients}
                />
            );
        }
        return (
            <Component
                patients={null}
            />
        )
    }

    return ComponentWithDataProp;
}
