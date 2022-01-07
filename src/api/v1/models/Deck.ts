import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm"
import { Card } from "./Card"
import { Tag } from "./Tag"


@Entity()
export class Deck {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @ManyToMany(type => Tag, tag => tag.decks)
    tags: Tag[]

    @ManyToMany(type => Card, card => card.decks)
    cards: Card[]

    @Column({type: 'float'})
    rank: number
}