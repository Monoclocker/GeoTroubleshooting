import MarkerCreateDTO from "./MarkerCreateDTO";

interface MarkerInfoDTO extends MarkerCreateDTO {
    timestamp: Date,
    id: string,
    label: string
}

export default MarkerInfoDTO