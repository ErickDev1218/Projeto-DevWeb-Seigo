type actCover = {
    url : string
}
type act_cover = {
    url : string
    idCover : string
}
export type actionCardProps = {
    id ?: number
    url : string | undefined
    idCover : string
    idCapCover ?: string
    actDetails : string
    isReady : boolean
    actCover? : actCover
    handleDelete ?: (id : string) => void
}

export type capCardProps = {
    act_cover : act_cover
    capCover : {
        url : string
    }
    idCapCover : string

}

export type User = {
    id: string
    username : string
    email : string
    role : {
        name : string
    }
}

export type capCoverProps = {
    capCover : string
    idCapCover : string
    handleDelete? : (id : string) => void
}

export type CommentFormatResponse = {
    user : User
    text : string
    cap_cover : {
        id : number
        idCapCover : string
    }
}