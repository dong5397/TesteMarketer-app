import React from "react";
import styled from "styled-components";

const Section = styled.section`
  display: grid;
  place-items: center;
  padding-block: var(--space-fluid-md);
  background: linear-gradient(#e0e09d, #e7e78b);
  inline-size: 100%;
`;

const CardList = styled.ul`
  display: grid;
  gap: var(--space-lg);
  list-style: none;
  max-inline-size: 980px;
  padding: var(--space-md);

  @media (width > 692px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const CardContainer = styled.div`
  background-color: var(--surface-2);
  block-size: 100%;
  border-radius: var(--radius-md);
  display: grid;
  grid-template-rows: min-content 1fr;
  overflow: clip;
`;

const Visual = styled.div`
  margin-top: 50px;
  block-size: 180px;
  background-color: var(--surface-3);
`;

const CardContent = styled.div`
  align-content: space-between;
  display: grid;
  gap: var(--space-lg);
  padding: var(--space-lg);
  place-items: start;
`;

const Meta = styled.div`
  display: grid;
  gap: var(--space-xs);
`;

const Title = styled.h3`
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-bold);
`;

const Description = styled.p`
  font-size: var(--font-size-body);
`;

const Category = styled.div`
  color: var(--text-2);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-bold);
`;

const CardImage = styled.img`
  block-size: 100%;
  inline-size: 100%;
  object-fit: cover;
  object-position: center;
`;

const ButtonLink = styled.a`
  -webkit-font-smoothing: antialiased;
  -webkit-tap-highlight-color: transparent;
  background: transparent;
  border-radius: var(--radius-md);
  border: var(--border-thin) solid var(--border-color);
  color: var(--text-1);
  cursor: pointer;
  display: inline-grid;
  font-weight: var(--font-weight-bold);
  gap: var(--space-xs);
  grid-auto-flow: column;
  min-block-size: 34px;
  min-inline-size: 100px;
  outline: none;
  padding-inline: var(--space-lg);
  place-items: center;
  text-align: center;
  text-decoration: none;
  text-size-adjust: 100%;
  text-wrap: nowrap;
  touch-action: manipulation;
  transition: background-color 0.2s var(--timing-function-slow-ease);
  user-select: none;
  white-space: nowrap;

  &.primary {
    background: var(--text-1);
    border-color: inherit;
    color: var(--surface-1);
    outline-color: var(--surface-1);
    text-decoration-color: var(--surface-1);

    &:hover {
      background-color: color-mix(
        in oklch,
        oklch(0 0 0 / 0%) 20%,
        var(--text-1)
      );
    }
  }
`;

const Card = ({ category, title, desc, imageUrl }) => {
  return (
    <li>
      <CardContainer>
        <Visual>
          <CardImage className="card-image" src={imageUrl} alt={title} />
        </Visual>
        <CardContent>
          <Meta>
            <div className="card-header">
              <Category>{category}</Category>
              <Title>{title}</Title>
            </div>
            <Description>{desc}</Description>
          </Meta>
          <div className="controls">
            <ButtonLink href="#" className="button-link primary">
              Learn More
              <svg
                width="18"
                height="10"
                viewBox="0 0 18 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.1667 1.6665L16.5 4.99984M16.5 4.99984L13.1667 8.33317M16.5 4.99984L1.5 4.99984"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </ButtonLink>
          </div>
        </CardContent>
      </CardContainer>
    </li>
  );
};

const CardSection = ({ cards, theme }) => {
  return (
    <Section theme={theme}>
      <CardList className="card-list">
        {cards.map((card, index) => (
          <Card key={index} {...card} />
        ))}
      </CardList>
    </Section>
  );
};

function Main3() {
  const cards = [
    {
      category: "TECHNOLOGY",
      title: "Digital Transformation",
      desc: "Leveraging cutting-edge AI and cloud computing to drive global digital transformation.",
      imageUrl:
        "https://raw.githubusercontent.com/mobalti/open-props-interfaces/main/open-props-v2-adaptive-cards/images/img-1.avif",
    },
    {
      category: "TECH INDUSTRY",
      title: "Innovating Work Environments",
      desc: "Discover how our technologies create modern workspaces, enhancing productivity, and fostering collaboration.",
      imageUrl:
        "https://raw.githubusercontent.com/mobalti/open-props-interfaces/main/open-props-v2-adaptive-cards/images/img-2.avif",
    },
    {
      category: "TECH INFRASTRUCTURE",
      title: "Streamlining Operations",
      desc: "Optimize operations with our tech infrastructure solutions, ensuring seamless performance and reliability.",
      imageUrl:
        "https://raw.githubusercontent.com/mobalti/open-props-interfaces/main/open-props-v2-adaptive-cards/images/img-3.avif",
    },
  ];

  return (
    <div>
      <CardSection cards={cards} theme="dark" />
      <CardSection cards={cards} theme="light" />
    </div>
  );
}

export default Main3;
