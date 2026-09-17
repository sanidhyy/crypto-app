import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Card, Row, Col, Input } from "antd";

import { useGetCryptosQuery } from "../services/cryptoApi";
import { formatNumber } from "../utils/formatNumber";
import Loader from "./Loader";

type CryptocurrenciesProps = {
  simplified?: boolean;
};

const Cryptocurrencies = ({ simplified = false }: CryptocurrenciesProps) => {
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [searchTerm, setSearchTerm] = useState("");

  const cryptos = useMemo(() => {
    const re = RegExp(
      `.*${searchTerm.toLowerCase().replace(/\s+/g, "").split("").join(".*")}.*`
    );

    return (
      cryptosList?.data?.coins?.filter((coin) =>
        Boolean(coin.name.toLowerCase().match(re))
      ) ?? []
    );
  }, [cryptosList, searchTerm]);

  if (isFetching) return <Loader />;

  return (
    <>
      {!simplified && (
        <div className="search-crypto">
          <Input
            placeholder="Search Crypocurrency..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}

      <Row
        gutter={[32, 32]}
        className="crypto-card-container"
        style={!cryptos.length ? { justifyContent: "center" } : undefined}
      >
        {cryptos.length ? (
          cryptos.map((currency) => (
            <Col
              xs={24}
              sm={12}
              lg={6}
              className="crypto-card"
              key={currency.uuid}
            >
              <Link to={`/crypto/${currency.uuid}`}>
                <Card
                  title={`${currency.rank}. ${currency.name}`}
                  extra={
                    <img
                      className="crypto-image"
                      src={currency.iconUrl}
                      alt={currency.name}
                    />
                  }
                  hoverable
                >
                  <p>Price: {formatNumber(currency.price)}</p>
                  <p>Market Cap: {formatNumber(currency.marketCap)}</p>
                  <p>Daily Change: {formatNumber(currency.change)}%</p>
                </Card>
              </Link>
            </Col>
          ))
        ) : (
          <p style={{ textAlign: "center" }}>No Crytocurrencies Found.</p>
        )}
      </Row>
    </>
  );
};

export default Cryptocurrencies;
