import React from 'react';
import { type WardPatientCardElement } from '../../types';
import { type PatientCardElementConfig } from '../../config-schema';
import { Tag } from '@carbon/react';
import { translateFrom, type PatientIdentifier } from '@openmrs/esm-framework';
import { moduleName } from '../../constant';
import { useTranslation } from 'react-i18next';

//sort the identifiers by preferred first.The identifier with value of true
//takes precedence over false. if both identifiers have same preferred value
//sort them by  (dateChanged or dateCreated) in descending order
const identifierCompareFunction = (pi1: PatientIdentifier, pi2: PatientIdentifier) => {
  let comp = (pi2.preferred ? 1 : 0) - (pi1.preferred ? 1 : 0);

  if (comp == 0) {
    const date1 = pi1.auditInfo.dateChanged ?? pi1.auditInfo.dateCreated;
    const date2 = pi2.auditInfo.dateChanged ?? pi2.auditInfo.dateCreated;
    comp = date2.localeCompare(date1);
  }
  return comp;
};

const wardPatientIdentifier = (config: PatientCardElementConfig) => {
  const WardPatientIdentifier: WardPatientCardElement = ({ patient }) => {
    const { t } = useTranslation();
    const { identifier } = config;
    const { identifierTypeUuid, label } = identifier;
    const patientIdentifiers = patient.identifiers.filter(
      (patientIdentifier: PatientIdentifier) =>
        identifierTypeUuid == null || patientIdentifier.identifierType?.uuid === identifierTypeUuid,
    );
    patientIdentifiers.sort(identifierCompareFunction);
    const patientIdentifier = patientIdentifiers[0];
    const labelToDisplay =
      label != label != null ? t(label) : patientIdentifier?.identifierType?.name;
    return (
      <div>
        {labelToDisplay ? <Tag>{t('identifierTypelabel', '{{label}}:', { label: labelToDisplay })}</Tag> : <></>}
        <span>{patientIdentifier?.identifier}</span>
      </div>
    );
  };
  return WardPatientIdentifier;
};

export default wardPatientIdentifier;
