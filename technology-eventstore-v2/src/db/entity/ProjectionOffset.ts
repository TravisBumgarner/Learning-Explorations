import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity()
export default class ProjectionOffset {
    // https://typeorm.io/entities#column-types
    @PrimaryColumn({ nullable: false, type:'bigint' })
    commit_position: bigint
}