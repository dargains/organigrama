import { useEffect, useLayoutEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { OrgChart } from "d3-org-chart";

type OrgChart = {
  onNodeClick: (node: OrgItemData) => void;
  data: any;
};

type OrgItemData = {
  _directSubordinates: number;
  _directSubordinatesPaging: number;
  _pagingButton: boolean;
  _pagingStep: number;
  _totalSubordinates: number;
  area: string;
  id: string;
  imageUrl: string;
  isLoggedUser: string;
  name: string;
  office: string;
  parentId: string;
  positionName: string;
  profileUrl: string;
  size: string;
  tags: string;
};

type OrgItem = {
  height: number;
  width: number;
  data: OrgItemData;
};

type Chart = {
  container: (arg0: never) => {
    (): any;
    new (): any;
    data: {
      (arg0: any): {
        (): any;
        new (): any;
        nodeWidth: {
          (arg0: () => number): {
            (): any;
            new (): any;
            nodeHeight: {
              (arg0: () => number): {
                (): any;
                new (): any;
                initialZoom: {
                  (arg0: number): {
                    (): any;
                    new (): any;
                    childrenMargin: {
                      (arg0: () => number): {
                        (): any;
                        new (): any;
                        compactMarginBetween: {
                          (arg0: () => number): {
                            (): any;
                            new (): any;
                            compactMarginPair: {
                              (arg0: () => number): {
                                (): any;
                                new (): any;
                                nodeContent: {
                                  (arg0: (d: OrgItem) => string): {
                                    (): any;
                                    new (): any;
                                    onNodeClick: {
                                      (
                                        arg0: (d: any, i: any, arr: any) => void
                                      ): {
                                        (): any;
                                        new (): any;
                                        render: { (): void; new (): any };
                                      };
                                      new (): any;
                                    };
                                  };
                                  new (): any;
                                };
                              };
                              new (): any;
                            };
                          };
                          new (): any;
                        };
                      };
                      new (): any;
                    };
                  };
                  new (): any;
                };
              };
              new (): any;
            };
          };
          new (): any;
        };
      };
      new (): any;
    };
  };
};

const orgItem = (d: OrgItem) => {
  return `
    <div style="
      padding-top:30px;
      background-color:none;
      margin-left:1px;
      height:${d.height}px;
      border-radius:2px;
      overflow:visible
    ">
      <div style="
        height:${d.height - 32}px;
        padding-top:0px;
        background-color:white;
        border:1px solid lightgray;
      ">
        <img
          src="${d.data.imageUrl}"
          style="
            margin-top:-30px;
            margin-left:${d.width / 2 - 80}px;
            border-radius:120px;
            width:60px;
            height:60px;
            object-fit: cover;
        " />

      <div style="
        margin-right:10px;
        margin-top:15px;
        float:right
      ">${d.data.id}</div>
      
      <div style="
        margin-top:-30px;
        background-color:#3AB6E3;
        height:10px;
        width:${d.width - 2}px;
        border-radius:1px
      "></div>

      <div style="
        padding:20px;
        padding-top:35px;
        text-align:center
      ">
        <div style="
          color:#111672;
          font-size:16px;
          font-weight:bold
        "> ${d.data.name} </div>
        <div style="
          color:#404040;
          font-size:16px;
          margin-top:4px
        "> ${d.data.positionName} </div>
      </div> 
      <div style="
        display:flex;
        justify-content:space-between;
        padding-left:15px;
        padding-right:15px;
      ">
        <div> Manages:  ${d.data._directSubordinates} 👤</div>  
        <div> Oversees: ${d.data._totalSubordinates} 👤</div>    
      </div>
      </div>
    </div>
  `;
};

const OrgChartComponent = ({ onNodeClick, data }: OrgChart) => {
  const d3Container = useRef(null);
  let chart: Chart | null = null;

  useLayoutEffect(() => {
    if (data && d3Container.current) {
      if (!chart) {
        chart = new OrgChart();
      }
      if (chart) {
        chart
          .container(d3Container.current)
          .data(data)
          .nodeWidth(() => 250)
          .nodeHeight(() => 175)
          .initialZoom(0.7)
          .childrenMargin(() => 40)
          .compactMarginBetween(() => 15)
          .compactMarginPair(() => 80)
          .nodeContent(orgItem)
          .onNodeClick((d) => {
            console.log(d, `Id of clicked node ${d.id}`);
            onNodeClick(d);
          })
          .render();
      }
    }
  }, [data, d3Container.current]);

  return (
    <div>
      <div ref={d3Container} />
    </div>
  );
};

const OrgTree = () => {
  const [data, setData] = useState("");

  function onNodeClick(node: OrgItemData) {
    console.log("node", node);
    alert("clicked " + node.id);
  }

  useEffect(() => {
    d3.csv(
      "https://raw.githubusercontent.com/bumbeishvili/sample-data/main/org.csv"
    ).then((data: string) => {
      setData(data);
    });
  }, [true]);

  return <OrgChartComponent onNodeClick={onNodeClick} data={data} />;
};

export default OrgTree;
