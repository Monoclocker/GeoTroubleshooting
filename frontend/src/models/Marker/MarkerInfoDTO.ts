import MarkerCreateDTO from "./MarkerCreateDTO";

interface MarkerInfoDTO extends MarkerCreateDTO {
    timestamp: Date,
    id: string
}

export default MarkerInfoDTO