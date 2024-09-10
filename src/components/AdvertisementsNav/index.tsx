import { Button, Col, Row } from 'react-bootstrap';
import { Filter, SearchInput, Select } from '..';

interface AdvertisementsNavProps {
  setSearchQuery: (query: string) => void;
  setLimit: (limit: number) => void;
  setSortOrder: (sortOrder: string) => void;
  setSortType: (sortType: string) => void;
  openModal: (flag: boolean) => void;
}

export default function AdvertisementsNav({
  setSearchQuery,
  setLimit,
  openModal,
  setSortOrder,
  setSortType,
}: AdvertisementsNavProps): JSX.Element {
  const handleLimitChange = (value: string | number) => {
    setLimit(typeof value === 'string' ? Number(value) : value);
  };
  return (
    <>
      <Row className="my-4">
        <Col md={10}>
          <SearchInput setSearchQuery={setSearchQuery} />
        </Col>
        <Col md={2}>
          <Select
            setLimit={handleLimitChange}
            options={['10', '20', '30']}
            label="Количество карточек"
          />
        </Col>
        <Col>
          <Filter setSortOrder={setSortOrder} setSortType={setSortType} />
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
