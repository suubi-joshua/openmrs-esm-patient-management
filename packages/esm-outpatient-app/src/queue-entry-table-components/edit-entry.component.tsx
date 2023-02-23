import React, { useCallback } from 'react';
import { Collaborate } from '@carbon/react/icons';
import { MappedVisitQueueEntry } from '../active-visits/active-visits-table.resource';
import { useTranslation } from 'react-i18next';
import { showModal } from '@openmrs/esm-framework';
import { Button } from '@carbon/react';
import styles from './edit-entry.scss';

interface EditMenuProps {
  queueEntry: MappedVisitQueueEntry;
  closeModal: () => void;
}
const EditMenu: React.FC<EditMenuProps> = ({ queueEntry, closeModal }) => {
  const { t } = useTranslation();
  const launchEditPriorityModal = useCallback(() => {
    const dispose = showModal('edit-queue-entry-status-modal', {
      closeModal: () => dispose(),
      queueEntry,
    });
  }, [queueEntry]);

  return (
    <Button
      onClick={launchEditPriorityModal}
      className={styles.editIcon}
      iconDescription={t('editQueueEntryStatusTooltip', 'Edit')}
      hasIconOnly
      renderIcon={(props) => <Collaborate size={16} {...props} />}
    />
  );
};

export default EditMenu;