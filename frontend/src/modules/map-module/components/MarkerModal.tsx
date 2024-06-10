import { Button, Descriptions, DescriptionsProps, Image, Modal } from "antd";
import MarkerInfoDTO from "../../../models/Marker/MarkerInfoDTO";
import { IMAGE_ADDRESS } from "../../../utils/APIConstants";
import React from "react";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

interface Props {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    marker: MarkerInfoDTO
}

const MarkerModal = observer((props: Props) => {

    console.log(IMAGE_ADDRESS)

    const items: DescriptionsProps['items'] = [
        {
            key: '1',
            label: 'ID',
            children:  props.marker.id 
        },
        {
            key: '2',
            label: 'Название',
            children: props.marker.name 
        },
        {
            key: '3',
            label: 'Имя пользователя',
            children: <Link to={"/profile/" + props.marker.username}>{props.marker.username}</Link>
        },
        {
            key: '4',
            label: 'Описание',
            children: props.marker.description ?? "Отсутвует"
        },
        {
            key: '5',
            label: 'Время создания',
            children: new Date(props.marker.timestamp).toLocaleString()
        },
        {
            key: '6',
            label: 'Примечание',
            children: props.marker.label 
        },
        {
            key: '7',
            label: 'Изображение',
            children: <>
                {props.marker.attachments.map((attachment) => {

                    if (!attachment.type.includes("image")) {
                        return
                    }

                    return <Image width={150} src={IMAGE_ADDRESS + attachment.path}>
                    </Image>
                })}
            </>
        },
        {
            key: '8',
            label: 'Файлы',
            children: <>
                {props.marker.attachments.map((attachment) => {

                    if (attachment.type.includes("image")) {
                        return
                    }

                    return <a type='button' href={IMAGE_ADDRESS + attachment.path}>{attachment.path}</a>
                })}
            </>
        }
    ]

    return (
        <Modal open={true} footer={<></>} destroyOnClose={true} onCancel={() => props.setOpen(false)}>
            <Descriptions layout="vertical" items={items}></Descriptions>
        </Modal>
    )
    
})
export default MarkerModal