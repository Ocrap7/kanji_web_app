import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm"
import { Deck } from "./Deck"


@Entity()
export class Card {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    kanji: string

    @Column('text', {array: true})
    readings: string[]

    @Column('text', {array: true})
    meaning: string[]

    @Column()
    note?: string

    @ManyToMany(type => Deck, deck => deck.cards)
    decks: Deck[]
}