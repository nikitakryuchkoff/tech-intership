import { Button, Col, Row } from 'react-bootstrap';
import { Filter, SearchInput, Select } from '..';

interface AdvertisementsNavProps {
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  setter: React.Dispatch<React.SetStateAction<string>>;
  setSortOrder: React.Dispatch<React.SetStateAction<string>>;
  setSortType: React.Dispatch<React.SetStateAction<string>>;
  openModal: React.Dispatch<React.SetStateAction<boolean>>;
  limit: string;
  sortType: string;
  sortOrder: string;
}

export default function AdvertisementsNav({
  setSearchQuery,
  setter,
  setSortOrder,
  setSortType,
  openModal,
  limit,
  sortType,
  sortOrder,
}: AdvertisementsNavProps): JSX.Element {
  return (
    <>
      <Row className="my-4">
        <Col md={10}>
          <SearchInput setSearchQuery={setSearchQuery} />
        </Col>
        <Col md={2}>
          <Select
            setter={setter}
            options={['10', '20', '30']}
            label="Показывать"
            value={limit}
          />
        </Col>
        <Col>
          <Filter
            sortOrder={sortOrder}
            sortType={sortType}
            setSortOrder={setSortOrder}
            setSortType={setSortType}
            sortTypesArray={['Цена', 'Лайки', 'Просмотры']}
            sortOrderArray={['По возрастанию', 'По убыванию']}
          />
        </Col>
      </Row>
      <Row>
        <Col md={3}>
          <Button onClick={() => openModal(true)}>Добавить объявление</Button>
        </Col>
      </Row>
    </>
  );
}
