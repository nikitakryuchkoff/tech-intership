import { useEffect, useRef, useState } from 'react';
import {
  AdvertisementsList,
  AdvertisementsNav,
  Pagination,
  CreateAdvertisementModal,
  SkeletonAdvertisementList,
} from '../../components';
import useDebounce from '../../hooks/useDebounce';
import { Advertisment } from '../../types';
import fetchAdvertisements from '../../utils/fetchSearchAdvertisement';

export default function AdvertisementsPage(): JSX.Element {
  const [advertisements, setAdvertisements] = useState<Advertisment[]>([]);
  const [currentAdvertisements, setCurrentAdvertisements] = useState<
    Advertisment[]
  >([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const debouncedQuery = useDebounce<string>(searchQuery, 333);
  const [limit, setLimit] = useState<string>('10');
  const [page, setPage] = useState<number>(1);
  const [sortOrder, setSortOrder] = useState<string>('По возрастанию');
  const [sortType, setSortType] = useState<string>('Цена');
  const [modal, setModal] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const totalCount = useRef<number>(1);
  const totalPages = Math.ceil(totalCount.current / +limit);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    fetchAdvertisements({
      debouncedQuery,
      limit,
      page,
      sortOrder,
      sortType,
      signal,
    }).then(({ data, itemsCount }) => {
      setAdvertisements(data);
      totalCount.current = itemsCount;
      setLoading(false);
    });
    return () => {
      controller.abort();
    };
  }, [debouncedQuery, limit, page, sortOrder, sortType]);

  useEffect(() => {
    setCurrentAdvertisements(advertisements);
  }, [advertisements]);

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
        setCurrentAdvertisements={setCurrentAdvertisements}
      />
    </>
  );
}
