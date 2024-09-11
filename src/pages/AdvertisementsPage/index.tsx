import {
  AdvertisementsList,
  AdvertisementsNav,
  Pagination,
  CreateAdvertisementModal,
  SkeletonAdvertisementList,
} from '../../components';
import { useAdvertisements } from '../../context/AdvertisementsContext';

export default function AdvertisementsPage(): JSX.Element {
  const {
    currentAdvertisements,
    setSearchQuery,
    setLimit,
    page,
    setPage,
    setSortOrder,
    setSortType,
    modal,
    setModal,
    loading,
    totalPages,
  } = useAdvertisements();

  return (
    <>
      <AdvertisementsNav
        openModal={setModal}
        setSearchQuery={setSearchQuery}
        setter={setLimit}
        setSortOrder={setSortOrder}
        setSortType={setSortType}
      />
      {loading ? (
        <SkeletonAdvertisementList
          currentAdvertisements={currentAdvertisements}
        />
      ) : (
        <AdvertisementsList currentAdvertisements={currentAdvertisements} />
      )}
      {totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
      <CreateAdvertisementModal
        show={modal}
        closeModal={() => setModal(false)}
        setCurrentAdvertisements={() => {}}
      />
    </>
  );
}
