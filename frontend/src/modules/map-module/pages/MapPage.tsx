import { observer } from "mobx-react-lite";
import { useStores } from "../../../hooks/RootContext";
import MapComponent from "../components/MapComponent";
import { MarkerForm } from "../components/MarkerForm";
import { useEffect } from "react";


export const MapPage = observer(() => {

    const { mapStore } = useStores()

    useEffect(() => {

    }, [])

    return (<>

        <MapComponent />

        {mapStore.formIsOpened ?
            <MarkerForm /> :
            null
        }

        
        
    </>)
})

