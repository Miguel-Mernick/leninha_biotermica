import Card from "../components/Card";

export default function Home() {
  return (
    <div className="hero">
      <h1>Energia Sustentável para o Futuro</h1>
      <p>
        Projeto escolar sobre Biomassa e Energia Geotérmica.
      </p>

      <div className="grid">
        <Card title="♻️ Biomassa">
          Energia gerada a partir de matéria orgânica.
        </Card>

        <Card title="🌋 Energia Geotérmica">
          Energia obtida do calor interno da Terra.
        </Card>
      </div>
    </div>
  );
}