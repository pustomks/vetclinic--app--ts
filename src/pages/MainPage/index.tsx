import { Typography, Button, Row, Col, Card, Space, Carousel } from "antd";
import {
  HeartOutlined,
  ClockCircleOutlined,
  SafetyCertificateOutlined,
  ArrowRightOutlined,
  NotificationOutlined,
  ExperimentOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Title, Paragraph, Text } = Typography;

export default function MainPage() {
  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 20px" }}>
      <Row
        gutter={[32, 32]}
        align="middle"
        style={{ marginBottom: 64, textAlign: "left" }}
      >
        <Col span={12}>
          <Typography>
            <Title
              level={1}
              style={{ fontSize: "3rem", lineHeight: 1.2, marginBottom: 16 }}
            >
              Забота о тех, кто любит вас безусловно
            </Title>
            <Paragraph
              style={{ fontSize: 18, color: "#64748b", marginBottom: 32 }}
            >
              Современная ветеринарная клиника с передовым оборудованием и
              любящими врачами. Поможем вашему питомцу быть здоровым и
              счастливым.
            </Paragraph>
          </Typography>
          <Space size="middle">
            <Link to="/doctors">
              <Button
                type="primary"
                size="large"
                style={{ height: 48, padding: "0 32px", fontSize: 16 }}
              >
                Записаться на приём
              </Button>
            </Link>
            <Link to="/about">
              <Button
                size="large"
                style={{ height: 48, padding: "0 24px", fontSize: 16 }}
              >
                О клинике
              </Button>
            </Link>
          </Space>
        </Col>

        <Col span={12}>
          <Carousel
            autoplay
            autoplaySpeed={4000}
            effect="fade"
            style={{
              borderRadius: 24,
              overflow: "hidden",
              boxShadow: "0 10px 30px rgba(0,0,0,0.04)",
            }}
          >
            <div>
              <div
                style={{
                  padding: "40px 32px",
                  height: 320,
                  backgroundColor: "#e0f2fe",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <SmileOutlined
                  style={{ fontSize: 36, color: "#0284c7", marginBottom: 16 }}
                />
                <Title
                  level={3}
                  style={{ color: "#0369a1", margin: "0 0 8px 0" }}
                >
                  Первый визит?
                </Title>
                <Paragraph
                  style={{ color: "#0c4a6e", fontSize: 15, margin: 0 }}
                >
                  Дарим скидку 10% на первичный осмотр терапевта для всех новых
                  пушистых пациентов!
                </Paragraph>
              </div>
            </div>

            <div>
              <div
                style={{
                  padding: "40px 32px",
                  height: 320,
                  backgroundColor: "#fee2e2",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <NotificationOutlined
                  style={{ fontSize: 36, color: "#dc2626", marginBottom: 16 }}
                />
                <Title
                  level={3}
                  style={{ color: "#991b1b", margin: "0 0 8px 0" }}
                >
                  Сезонная защита
                </Title>
                <Paragraph
                  style={{ color: "#7f1d1d", fontSize: 15, margin: 0 }}
                >
                  Активизировались клещи! Защитите питомца вовремя. В наличии
                  лучшие таблетки и капли для вакцинации.
                </Paragraph>
              </div>
            </div>

            <div>
              <div
                style={{
                  padding: "40px 32px",
                  height: 320,
                  backgroundColor: "#dcfce7",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <ExperimentOutlined
                  style={{ fontSize: 36, color: "#16a34a", marginBottom: 16 }}
                />
                <Title
                  level={3}
                  style={{ color: "#166534", margin: "0 0 8px 0" }}
                >
                  Собственная лаборатория
                </Title>
                <Paragraph
                  style={{ color: "#14532d", fontSize: 15, margin: 0 }}
                >
                  Результаты анализов крови и мочи за 20 минут прямо в клинике.
                  Быстрый диагноз в экстренных ситуациях.
                </Paragraph>
              </div>
            </div>
          </Carousel>
        </Col>
      </Row>

      <div style={{ marginBottom: 64 }}>
        <Title level={2} style={{ textAlign: "center", marginBottom: 40 }}>
          Почему выбирают нас
        </Title>
        <Row gutter={[24, 24]}>
          <Col span={8}>
            <Card
              hoverable
              style={{ height: "100%", textAlign: "center", borderRadius: 12 }}
            >
              <ClockCircleOutlined
                style={{ fontSize: 40, color: "#1677ff", marginBottom: 16 }}
              />
              <Title level={4}>Режим 24/7</Title>
              <Text type="secondary">
                Готовы помочь вашему любимцу в любое время дня и ночи, без
                выходных.
              </Text>
            </Card>
          </Col>
          <Col span={8}>
            <Card
              hoverable
              style={{ height: "100%", textAlign: "center", borderRadius: 12 }}
            >
              <HeartOutlined
                style={{ fontSize: 40, color: "#ff4d4f", marginBottom: 16 }}
              />
              <Title level={4}>Любовь и забота</Title>
              <Text type="secondary">
                Относимся к каждому пациенту как к собственному члену семьи.
              </Text>
            </Card>
          </Col>
          <Col span={8}>
            <Card
              hoverable
              style={{ height: "100%", textAlign: "center", borderRadius: 12 }}
            >
              <SafetyCertificateOutlined
                style={{ fontSize: 40, color: "#52c41a", marginBottom: 16 }}
              />
              <Title level={4}>Лучшие врачи</Title>
              <Text type="secondary">
                Квалифицированные специалисты с европейским опытом и лицензиями.
              </Text>
            </Card>
          </Col>
        </Row>
      </div>

      <Card
        style={{
          borderRadius: 16,
          backgroundColor: "#ffffff",
          border: "1px solid #e2e8f0",
        }}
      >
        <Row gutter={[24, 24]} align="middle" style={{ textAlign: "left" }}>
          <Col span={18}>
            <Title level={3} style={{ margin: 0, marginBottom: 8 }}>
              У вас уже есть питомец в нашей системе?
            </Title>
            <Text type="secondary" style={{ fontSize: 15 }}>
              Перейдите в "Мои питомцы", чтобы добавлять новых животных.
            </Text>
          </Col>
          <Col span={6} style={{ textAlign: "right" }}>
            <Link to="/mypets">
              <Button
                type="default"
                size="large"
                icon={<ArrowRightOutlined />}
                block
              >
                Мои питомцы
              </Button>
            </Link>
          </Col>
        </Row>
      </Card>
    </div>
  );
}
