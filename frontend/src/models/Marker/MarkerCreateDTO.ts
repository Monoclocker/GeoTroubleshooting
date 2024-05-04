import { LngLat } from "@yandex/ymaps3-types";
import Attachment from "../General/Attachment";

interface MarkerCreateDTO {
    name: string,
    placeId: number,
    username: string,
    coordinates: LngLat,
    attachments: Attachment[],
    tags: string[],
    description?: string
}

export default MarkerCreateDTO
