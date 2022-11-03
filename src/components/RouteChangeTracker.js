import { useEffect, useState } from 'react';
import ReactGA from 'react-ga';

const RouteChangeTracker = ({location}) => {
    // const location = useLocation;
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        ReactGA.initialize('UA-93879621-2');
        setInitialized(true);
    }, []);
    
    useEffect(() => {
        if(initialized) {
            ReactGA.pageview(location.pathname + location.search);
        }
    }, [initialized, location]);
};

export default RouteChangeTracker;