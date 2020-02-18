import {countries} from './countries';
import Joi from '@hapi/joi';
import StepperGeneralIcon from '../../../assets/SvgComponents/StepperGeneralIcon';
import StepperDetailsIcon from '../../../assets/SvgComponents/StepperDetailsIcon';
import StepperHostingIcon from '../../../assets/SvgComponents/StepperHostingIcon';
import StepperMetaMaskIcon from '../../../assets/SvgComponents/StepperMetaMaskIcon';

export const wizardConfig = [
  {
    type: 'step',
    name: 'General',
    icon: StepperGeneralIcon,
    longName: 'General information',
    description: 'You will need at least 0.1 ether in your MetaMask account.',
    sections: [
      {
        name: 'Main info',
        type: 'section',
        fields: [
          {
            type: 'select',
            name: 'Directory',
            options: {
              'hotel': 'Hotel',
              'airline': 'Airline',
              'insurance': 'Insurance',
              'ota': 'Travel agencies'
            },
            required: true,
            orgidJsonPath: 'entity.type'
          },
          {
            type: 'input',
            name: 'Organization name',
            required: true,
            orgidJsonPath: 'entity.name'
          },
          {
            type: 'select',
            name: 'Legal form',
            options: [
              'private entrepreneur',
              'private company limited by shares or Ltd. (UK, Ireland and the Commonwealth)',
              'public limited company (UK, Ireland and the Commonwealth)',
              'limited partnership',
              'unlimited partnership',
              'chartered company',
              'statutory company',
              'holding company',
              'subsidiary company',
              'one man company (sole proprietorship)',
              'charitable incorporated organisation (UK)',
              'non-governmental organization',
            ],
            required: true,
            orgidJsonPath: 'entity.legalType'
          },
        ]
      },
      {
        name: 'Location',
        type: 'section',
        fields: [
          {
            type: 'select',
            name: 'Country',
            options: countries,
            required: true,
            orgidJsonPath: 'legalEntity.registeredAddress.country'
          },
          {
            type: 'input',
            name: 'Subdivision',
            orgidJsonPath: 'legalEntity.registeredAddress.subdivision'
          },
          {
            type: 'input',
            name: 'Locality',
            orgidJsonPath: 'legalEntity.registeredAddress.locality'
          },
          {
            type: 'input',
            name: 'postal code',
            orgidJsonPath: 'legalEntity.registeredAddress.postal_code'
          },
          {
            type: 'input',
            name: 'Street, building',
            orgidJsonPath: 'legalEntity.registeredAddress.street_address'
          },
          {
            type: 'input',
            name: 'Premise',
            orgidJsonPath: 'legalEntity.registeredAddress.premise'
          }
        ]
      },
      {
        name: 'Contact information',
        type: 'section',
        fields: [
          {
            type: 'input',
            subtype: 'phone',
            name: 'Phone',
            orgidJsonPath: 'legalEntity.contacts[0].phone'
          },
          {
            type: 'input',
            subtype: 'website',
            name: 'Website',
            orgidJsonPath: 'legalEntity.contacts[0].website',
            schema: Joi.string().pattern(/^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/, 'uri')
          }
        ]
      },
      {
        name: 'Social media accounts',
        type: 'section',
        fields: [
          {
            name: 'Facebook',
            type: 'input',
            orgidJsonPath: 'legalEntity.contacts[0].facebook',
          },
          {
            name: 'Twitter',
            type: 'input',
            orgidJsonPath: 'legalEntity.contacts[0].twitter',
          },
          {
            name: 'Instagram',
            type: 'input',
            orgidJsonPath: 'legalEntity.contacts[0].instagram',
          },
          {
            name: 'Logo',
            type: 'dropzone',
            orgidJsonPath: 'media[0].uri',
            description: 'Add a logo or any image that represents your organization. It will help you stand out in search results.',
            helperText: 'Recommended dimensions: 908х400 (minimal: 454x200)\nFormat: JPG, PNG'
          }
        ]
      }
    ],
    cta: 'Next'
  },
  {
    type: 'step',
    name: 'Details',
    icon: StepperDetailsIcon,
    longName: 'Details',
    description: 'You can tell us a bit more about your sub-organization or skip this step.',
    sections: [
      {
        name: 'Main info',
        type: 'section',
        fields: [
          {
            type: 'input',
            name: 'Title',
            orgidJsonPath: 'entity.details.title'
          },
          {
            type: 'input',
            name: 'Organization details',
            orgidJsonPath: 'entity.details.details'
          }
        ]
      }
    ],
    cta: 'Next'
  },
  {
    type: 'step_hosting',
    name: 'Hosting',
    icon: StepperHostingIcon,
    longName: 'Hosting information',
    description: 'The description that Arbor offers two types of hosting, depending on your needs.',
    sections: [
      {
        name: 'Choose type of JSON hosting',
        type: 'section',
        fields: [
          {
            name: 'step2 test',
            type: 'input'
          },
          {
            name: 'Choose type of JSON hosting',
            type: 'json_hosting'
          }
        ]
      }
    ],
    cta: 'Confirm'
  },
  {
    type: 'step_metamask',
    name: 'Confirmation',
    icon: StepperMetaMaskIcon,
    longName: 'MetaMask confirming',
    description: 'MetaMask also lets the user create and manage their own identities, so when a Dapp wants to perform a transaction and write to the blockchain, the user gets a secure interface to review the transaction, before approving or rejecting it.',
    cta: 'Register my organization'
  }
];
