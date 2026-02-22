import {TfiLayoutGrid3Alt as icon} from 'react-icons/tfi'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const postsGridContainer = defineType({
  name: 'postsGridContainer',
  type: 'object',
  title: 'Posts Grid',
  icon,
  description: 'Select the posts that you would like to display in this section.',
  initialValue: {
    backgroundColor: 'White',
  },
  fields: [
    defineField({
      name: 'backgroundColor',
      title: 'Optional Background Colour',
      type: 'string',
      description:
        'If no background image is uploaded, you can choose a background colour. If no selection is made, the default is white.',
      options: {
        list: [
          {title: 'White', value: '#ffffff'},
          {title: 'Grey', value: '#e2e2e2'},
          {title: 'Blue', value: '#61c8e9'},
          {title: 'Yellow', value: '#feca2d'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
    }),
    defineField({
      title: 'Posts',
      name: 'posts',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{type: 'post'}],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      post0: 'posts.0.title',
      post1: 'posts.1.title',
      post2: 'posts.2.title',
      post3: 'posts.3.title',
      postImage: 'posts.0.image',
    },
    prepare: ({post0, post1, post2, post3, postImage}) => {
      const posts = [post0, post1, post2].filter(Boolean)
      const subtitle = posts.length > 0 ? `${posts.join(', ')}` : ''
      const hasMorePosts = Boolean(post3)

      return {
        title: 'Posts',
        subtitle: hasMorePosts ? `${subtitle}…` : subtitle,
        media: postImage || icon,
      }
    },
  },
})

