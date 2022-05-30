interface IAddressTemplateComponent {
  key: string;
  dismissComma?: boolean;
}

export const addressTemplateComponents: Array<IAddressTemplateComponent> = [
  { key: 'street_number' },
  { key: 'street_name', dismissComma: true },
  { key: 'sublocality' },
  { key: 'city' },
  { key: 'state_or_province' },
  { key: 'zip_or_postal_code' },
  { key: 'country' },
];

export const templateAddressPart = (
  addressTemplateComponent: IAddressTemplateComponent,
  addressPart: string,
  fullAddress: string,
) => {
  return addressTemplateComponent.dismissComma ? `${fullAddress} ${addressPart}` : `${fullAddress}, ${addressPart}`;
};
