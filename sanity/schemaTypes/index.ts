import {type SchemaTypeDefinition} from 'sanity'
import {userType} from './userType'
import {postType} from './postType'
import {commentType} from './commentType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [userType,postType,commentType],
}
