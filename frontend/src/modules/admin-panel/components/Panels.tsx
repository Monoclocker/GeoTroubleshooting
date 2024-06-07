import { Button, Drawer, GetProp, Input, Space, Table, TablePaginationConfig, TableProps } from "antd";
import { useEffect, useState } from "react";
import PlacesService from "../services/PlacesService";
import UtilsService from "../../../utils/UtilsService";
import { useStores } from "../../../hooks/RootContext";
import { useNavigate } from "react-router";
import PlaceTypeDTO from "../../../models/Places/PlaceTypeDTO";
import MapPanel from "./MapPanel";
import { DefaultOptionType } from "antd/es/select";

interface PlaceDataType {
    key: number;
    name: string
    coordinates: string
    type: string,
    typeKey: number
}

interface TableParams {
    pagination?: TablePaginationConfig;
    filters?: Parameters<GetProp<TableProps, 'onChange'>>[1];
}

interface TypesDataType {
    key: number;
    name: string;
}

const Panels = () => {
    const {  AddType, DeletePlace, DeleteType } = PlacesService
    const navigate = useNavigate()
    const [options, setOptions] = useState<DefaultOptionType[]>([])
    const [typeName, setTypeName] = useState("")
    const [placeName, setPlaceName] = useState("")
    const [isModalOpen, openModal] = useState(false)

    const [typesTableParams, setTypesTableParams] = useState<TableParams>({
        pagination: {
            current: 1,
            pageSize: 5,
        },
    });

    const [placesTableParams, setPlacesTableParams] = useState<TableParams>({
        pagination: {
            current: 1,
            pageSize: 5,
        },
    });


    const [typesData, setTypesData] = useState<TypesDataType[]>([])
    const [placeData, setPlaceData] = useState<PlaceDataType[]>([])


    const { GetPlaces } = UtilsService
    const { userStore, authStore } = useStores()

    const onPlaceDelete = async (id: number) => {
        const result = await DeletePlace(id)

        if (result) {
            setPlaceData(placeData.filter(x => x.key !== id))
        }

    }

    const onTypeDelete = async (id: number) => {
        const result = await DeleteType(id)

        if (result) {
            setPlaceData(placeData.filter(x => x.typeKey !== id))
            setTypesData(typesData.filter(x => x.key !== id))
            
        }

    }

    const placeColumns = [
        {
            title: 'Название объекта',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Местоположение',
            dataIndex: 'coordinates',
            key: 'coordinates',
        },
        {
            title: 'Название типа',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'Действия',
            dataIndex: 'actions',
            key: 'actions',
            render: (_, record) => (
                <Space size="middle">
                    <Button onClick={() => { console.log(record); onPlaceDelete(record.key) }} >Удалить</Button>
                </Space>
            ),
        },
    ];

    const typesColumns = [
        {
            title: 'Название типа',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Действия',
            dataIndex: 'actions',
            key: 'actions',
            render: (_, record) => (
                <Space size="middle">
                    <Button onClick={() => { console.log(record); onTypeDelete(record.key) }} >Удалить</Button>
                </Space>
            ),
        },
    ];

    useEffect(() => {
        if (userStore.User.role !== "Admin" || !authStore.checkAuth()) {
            navigate("/login")
            return
        }

        const func = async () => {
            const result = await GetPlaces()
            console.log(result?.length)

            const places: PlaceDataType[] = []
            const types: TypesDataType[] = []
            const _options: DefaultOptionType[] = []

            if (result !== null) {
                result.forEach((placeType) => {
                    types.push({ name: placeType.name, key: placeType.id })
                    placeType.places.forEach((place) => {
                        places.push({ name: place.name, key: place.id, type: placeType.name, coordinates: place.coordinates[0] + " " + place.coordinates[1], typeKey: placeType.id })
                    })
                    _options.push({ value: placeType.id, label: placeType.name })
                })
            }

            setPlaceData(places)
            setTypesData(types)
            setOptions(_options)
        }

        func()
    }, [])


    const AddNewType = async () => {
        const newType = await AddType({ name: typeName } as PlaceTypeDTO)
        if (newType === null) {
            navigate("profile")
            return
        }
        const displayedType: TypesDataType = { name: newType.name, key: newType.id }
        setTypesData([...typesData, displayedType])
        setOptions([...options, { label: displayedType.name, value: displayedType.key }])
    }

    const handleTypesTableChange: TableProps['onChange'] = (pagination, filters) => {
        setTypesTableParams({
            pagination,
            filters,
        });
    }

    const handlePlacesTableChange: TableProps['onChange'] = (pagination, filters) => {
        setPlacesTableParams({
            pagination,
            filters,
        });
    }


    return (
        <>
            <Input onChange={event => setTypeName(event.target.value)} />,
            <Button onClick={() => AddNewType()}>Добавить</Button>
            <Table onChange={handleTypesTableChange}
                pagination={typesTableParams.pagination} columns={typesColumns} dataSource={typesData} />
            <Input onChange={event => setPlaceName(event.target.value)} />

            <Button onClick={() => { if (placeName !== "") openModal(true) }}>Добавить</Button>

            <Table onChange={handlePlacesTableChange}
                pagination={placesTableParams.pagination} columns={placeColumns} dataSource={placeData} />

            <Drawer width={"100%"} open={isModalOpen} destroyOnClose={true} onClose={() => openModal(false)}>
                <MapPanel types={options} updatePlaces={setPlaceData} name={placeName} openModal={openModal} places={placeData} />
            </Drawer>
        </>
    )
}

export default Panels