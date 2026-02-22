import {FaEnvelope as emailIcon, FaPhoneAlt as phoneIcon} from 'react-icons/fa'
import {defineField, defineType} from 'sanity'

export const contactInfo = defineType({
  name: 'contactInfo',
  type: 'object',
  title: 'Contact Information',
  icon: phoneIcon,
  description: 'Reusable contact component with phone and email information.',
  fields: [
    defineField({
      name: 'headline',
      type: 'string',
      title: 'Headline (Optional)',
      description: 'Optional h4 headline to display above the contact information.',
    }),
    defineField({
      name: 'phoneNumber',
      type: 'string',
      title: 'Phone Number',
      description: 'Phone number to display (e.g., (403) 816-5629)',
      initialValue: '(403) 816-5629',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'phoneLabel',
      type: 'string',
      title: 'Phone Label (Optional)',
      description: 'Optional label below phone number (e.g., CALL OR TXT)',
      initialValue: '(CALL OR TXT)',
    }),
    defineField({
      name: 'email',
      type: 'string',
      title: 'Email Address',
      description: 'Email address to display',
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: 'textColor',
      type: 'string',
      title: 'Text Color',
      description: 'Text color for the contact information. Blue/Orange is the default.',
      options: {
        list: [
          {title: 'White Text/White Headline', value: 'white'},
          {title: 'Blue Text/Orange Headline', value: 'blue'},
        ],
        layout: 'radio',
      },
      initialValue: 'blue',
    }),
    defineField({
      name: 'size',
      type: 'string',
      title: 'Size',
      description: 'Size of the contact information. Large increases icon and text sizes.',
      options: {
        list: [
          {title: 'Normal', value: 'normal'},
          {title: 'Large', value: 'large'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'normal',
    }),
  ],
  preview: {
    select: {
      headline: 'headline',
      phone: 'phoneNumber',
      email: 'email',
    },
    prepare({headline, phone, email}) {
      return {
        title: headline || 'Contact Information',
        subtitle: `${phone} • ${email}`,
      }
    },
  },
})

