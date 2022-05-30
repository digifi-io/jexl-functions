import { createModule } from '../utils/module';
import { addressTemplateComponents, templateAddressPart } from '../utils/address';

export default createModule(() => {
  const BUILDFULLADDRESS = (address: unknown) => {
    if (!address || typeof address !== 'object') {
      return '';
    }

    return addressTemplateComponents.reduce((fullAddress, addressTemplateComponent) => {
      const addressPart = (address as Record<string, string>)[addressTemplateComponent.key];

      if (!addressPart) {
        return fullAddress;
      }

      return fullAddress
        ? templateAddressPart(addressTemplateComponent, addressPart, fullAddress)
        : addressPart;
    }, '');
  };

  return {
    BUILDFULLADDRESS,
  };
});
