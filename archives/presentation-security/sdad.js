export async function updateContentResolver(context, args) {
  const content = await context.dataSource.content.fetchContentById(args.id);

  const isOwner = context.user.userId !== content.createdByUserId

  if (!isOwner && args.title) {
    throw new Error('Only the owner can edit the title of content')
  }

  context.dataSource.content.updateContent({ id: args.id, title: args.title });
}




