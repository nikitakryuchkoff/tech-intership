import { useEffect, useRef, useState } from 'react';
import {
  AdvertisementsList,
  AdvertisementsNav,
  Pagination,
  CreateAdvertisementModal,
} from '../../components';
import { IAdvertisement } from '../../types';
import { AdvertismentsService } from '../../services';
import useDebounce from '../../hooks/useDebounce';
import filtredArray from '../../utils/filtredArray';

export default function AdvertisementsPage(): JSX.Element {
  const [advertisements, setAdvertisements] = useState<IAdvertisement[]>([]);
  const [currentAdvertisements, setCurrentAdvertisements] = useState<
    IAdvertisement[]
  >([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const debouncedQuery = useDebounce(searchQuery, 333);
  const [limit, setLimit] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [sortOrder, setSortOrder] = useState<string>('По возрастанию');
  const [sortType, setSortType] = useState<string>('Цена');
  const [modal, setModal] = useState<boolean>(false);

  const totalCount = useRef<number>(1);
  const totalPages = Math.ceil(totalCount.current / limit);

  const fetchAdvertisements = async () => {
    const { data, itemsCount } =
      await AdvertismentsService.getAllAdvertisements(page, limit);
    setAdvertisements(data);
    totalCount.current = itemsCount;
  };

  const searchAdvertisements = async () => {
    const { data, itemsCount } = await AdvertismentsService.searchByTitle(
      debouncedQuery,
      page,
      limit,
    );
    setCurrentAdvertisements(data);
    totalCount.current = itemsCount;
  };

  useEffect(() => {
    if (debouncedQuery) {
      searchAdvertisements();
    } else {
      fetchAdvertisements();
    }
  }, [debouncedQuery, limit, page]);

  useEffect(() => {
    setCurrentAdvertisements(advertisements);
  }, [advertisements]);

  useEffect(() => {
    const sortedAdvertisements = [...currentAdvertisements];
    filtredArray(sortedAdvertisements, sortType, sortOrder);
    setCurrentAdvertisements(sortedAdvertisements);
  }, [sortOrder, sortType]);

  return (
    <>
      <AdvertisementsNav
        openModal={setModal}
        setSearchQuery={setSearchQuery}
        setLimit={setLimit}
        setSortOrder={setSortOrder}
        setSortType={setSortType}
      />
      <AdvertisementsList currentAdvertisements={currentAdvertisements} />
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
        setCurrentAdvertisements={setCurrentAdvertisements}
      />
    </>
  );
}
