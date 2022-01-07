import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm"
import { Deck } from "./Deck"

@Entity()
export class Tag {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @ManyToMany(type => Deck, deck => deck.tags)
    decks: Deck[]
}