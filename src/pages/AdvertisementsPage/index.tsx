import { useEffect, useRef, useState } from 'react';
import {
  AdvertisementsList,
  AdvertisementsNav,
  CreateAdvertisementModal,
  Pagination,
} from '../../components';
import { IAdvertisements } from '../../types';
import { AdvertismentsService } from '../../services';

export default function AdvertisementsPage(): JSX.Element {
  const [advertisements, setAdvertisements] = useState<IAdvertisements[]>([]);
  const [modal, setModal] = useState<boolean>(false);
  const [currentAdvertisements, setCurrentAdvertisements] =
    useState<IAdvertisements[]>(advertisements);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [limit, setLimit] = useState<number>(10);
  const [page, setPage] = useState<number>(1);

  const totalCount = useRef<number>(1);
  const totalPages = totalCount && Math.ceil(totalCount.current / limit);

  const fetchAdvertisements = () => {
    AdvertismentsService.getAllAdvertisements(page, limit).then(
      ({ data, itemsCount }) => {
        setAdvertisements(data);
        totalCount.current = itemsCount;
      },
    );
  };

  const searchAdvertisements = () => {
    AdvertismentsService.searchByTitle(searchQuery, page, limit).then(
      ({ data, itemsCount }) => {
        setCurrentAdvertisements(data);
        totalCount.current = itemsCount;
      },
    );
  };

  useEffect(() => {
    if (searchQuery) {
      searchAdvertisements();
    } else {
      fetchAdvertisements();
    }
  }, [limit, page, searchQuery]);

  useEffect(() => {
    if (!searchQuery) {
      setCurrentAdvertisements(advertisements);
    }
  }, [advertisements, searchQuery]);

  return (
    <>
      <AdvertisementsNav
        openModal={setModal}
        setSearchQuery={setSearchQuery}
        setLimit={setLimit}
      />
      <AdvertisementsList currentAdvertisements={currentAdvertisements} />
      {totalPages !== undefined && totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
      <CreateAdvertisementModal
        show={modal}
        closeModal={setModal}
        setCurrentAdvertisements={setCurrentAdvertisements}
      />
    </>
  );
}
