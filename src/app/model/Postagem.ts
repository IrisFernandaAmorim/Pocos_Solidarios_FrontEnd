import { User } from "./User"
import { Tema } from "./Tema"

export class Postagem{

    public id: number
    public foto: string
    public localizacao: string
    public legenda: string
    public doacao: string
    public feedback: string
    public usuario: User
    public tema: Tema
    public data: Date
    public status?: string
}