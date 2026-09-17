import { useState } from "react";
import { Select, Typography, Row, Col, Avatar, Card } from "antd";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import { useGetCryptosQuery } from "../services/cryptoApi";

import Loader from "./Loader";
import demoImage from "../images/demo.jpg";

dayjs.extend(relativeTime);

const { Text, Title } = Typography;

type NewsProps = {
  simplified?: boolean;
};

const News = ({ simplified = false }: NewsProps) => {
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");

  const { data: cryptoNews } = useGetCryptoNewsQuery({
    newsCategory,
    count: simplified ? 6 : 12,
  });

  const { data } = useGetCryptosQuery(100);

  if (!cryptoNews?.value) return <Loader />;

  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            className="select-news"
            placeholder="Select a Crypto"
            optionFilterProp="label"
            onChange={(value) => setNewsCategory(value)}
            options={[
              { label: "Cryptocurrency", value: "Cryptocurrency" },
              ...(data?.data?.coins?.map((coin) => ({
                label: coin.name,
                value: coin.name,
              })) ?? []),
            ]}
          />
        </Col>
      )}

      {cryptoNews.value.map((news, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className="news-card">
            <a href={news.url} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Title className="news-title" level={4}>
                  {news.name}
                </Title>
                <img
                  src={news.image?.thumbnail?.contentUrl || demoImage}
                  alt={news.name}
                  style={{ maxWidth: "200px", maxHeight: "100px" }}
                />
              </div>
              <p>
                {(news.description?.length ?? 0) > 100
                  ? `${news.description?.substring(0, 100)}...`
                  : news.description}
              </p>
              <div className="provider-container">
                <div>
                  <Avatar
                    src={
                      news.provider?.[0]?.image?.thumbnail?.contentUrl ||
                      demoImage
                    }
                    alt={news.provider?.[0]?.name}
                  />
                  <Text className="provider-name">
                    {news.provider?.[0]?.name}
                  </Text>
                </div>
                <Text>{dayjs(news.datePublished).fromNow()}</Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default News;
