import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react';
import { Advertisment } from '../types';
import useDebounce from '../hooks/useDebounce';
import fetchAdvertisements from '../utils/fetchSearchAdvertisement';

interface AdvertisementsContextProps {
  advertisements: Advertisment[];
  currentAdvertisements: Advertisment[];
  searchQuery: string;
  limit: string;
  page: number;
  sortOrder: string;
  sortType: string;
  modal: boolean;
  loading: boolean;
  totalPages: number;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  setLimit: Dispatch<SetStateAction<string>>;
  setPage: Dispatch<SetStateAction<number>>;
  setSortOrder: Dispatch<SetStateAction<string>>;
  setSortType: Dispatch<SetStateAction<string>>;
  setModal: Dispatch<SetStateAction<boolean>>;
  setCurrentAdvertisements: Dispatch<SetStateAction<Advertisment[]>>;
}

const AdvertisementsContext = createContext<
  AdvertisementsContextProps | undefined
>(undefined);

export function AdvertisementsProvider({ children }: { children: ReactNode }) {
  const [advertisements, setAdvertisements] = useState<Advertisment[]>([]);
  const [currentAdvertisements, setCurrentAdvertisements] = useState<
    Advertisment[]
  >([]);

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [limit, setLimit] = useState<string>(
    localStorage.getItem('limit') || '10',
  );
  const [page, setPage] = useState<number>(
    Number(localStorage.getItem('page')) || 1,
  );
  const [sortOrder, setSortOrder] = useState<string>(
    localStorage.getItem('sortOrder') || 'По возрастанию',
  );
  const [sortType, setSortType] = useState<string>(
    localStorage.getItem('sortType') || 'Цена',
  );

  const [modal, setModal] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const totalCount = useRef<number>(1);
  const totalPages = Math.ceil(totalCount.current / +limit);
  const debouncedQuery = useDebounce<string>(searchQuery, 333);

  useEffect(() => {
    localStorage.setItem('limit', limit);
    localStorage.setItem('page', page.toString());
    localStorage.setItem('sortOrder', sortOrder);
    localStorage.setItem('sortType', sortType);
  }, [searchQuery, limit, page, sortOrder, sortType]);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    setLoading(true);
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
    <AdvertisementsContext.Provider
      value={{
        advertisements,
        currentAdvertisements,
        setCurrentAdvertisements,
        searchQuery,
        setSearchQuery,
        limit,
        setLimit,
        page,
        setPage,
        sortOrder,
        setSortOrder,
        sortType,
        setSortType,
        modal,
        setModal,
        loading,
        totalPages,
      }}
    >
      {children}
    </AdvertisementsContext.Provider>
  );
}

export function useAdvertisements() {
  const context = useContext(AdvertisementsContext);
  if (!context) {
    throw new Error(
      'useAdvertisements must be used within an AdvertisementsProvider',
    );
  }
  return context;
}
