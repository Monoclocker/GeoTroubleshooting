namespace Backend.Application.DTO.Places
{
    public class PlaceDTO
    {
        public int id {  get; set; }
        public string name { get; set; } = default!;
        public float[] coordinates { get; set; } = default!;
    }
}
