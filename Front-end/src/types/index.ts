type actCover = {
    url : string
}
type act_cover = {
    url : string
    idCover : string
}
export type actionCardProps = {
    url : string | undefined
    idCover : string
    actDetails : string
    isReady : boolean
    actCover? : actCover
}

export type capCardProps = {
    act_cover : act_cover
    capCover : {
        url : string
    }
    idCapCover : string

}