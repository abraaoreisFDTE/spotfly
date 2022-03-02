export interface IImagesPlaylist {
    height: number
    url: string
    width: number
}
export interface IPLaylist {
    images: IImagesPlaylist[],
    description: string,
    name: string,
}