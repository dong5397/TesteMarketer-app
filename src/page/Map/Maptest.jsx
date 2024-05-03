import React, { useState, useEffect } from "react";

const Map = () => {
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState(null);
  const [infowindow, setInfowindow] = useState(null);
  const [pagination, setPagination] = useState(null);
  const [keyword, setKeyword] = useState("");

  const mapRef = React.useRef();

  useEffect(() => {
    const mapInstance = new kakao.maps.Map(mapRef.current, {
      center: new kakao.maps.LatLng(37.566826, 126.9786567),
      level: 3,
    });
    setMap(mapInstance);
    const infowindowInstance = new kakao.maps.InfoWindow({ zIndex: 1 });
    setInfowindow(infowindowInstance);
    const ps = new kakao.maps.services.Places();
    setPagination(new kakao.maps.Pagination());
  }, []);

  const searchPlaces = () => {
    if (!keyword.replace(/^\s+|\s+$/g, "")) {
      alert("키워드를 입력해주세요!");
      return false;
    }

    const ps = new kakao.maps.services.Places();
    ps.keywordSearch(keyword, placesSearchCB);
  };

  const placesSearchCB = (data, status, pagination) => {
    if (status === kakao.maps.services.Status.OK) {
      displayPlaces(data);
      displayPagination(pagination);
    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
      alert("검색 결과가 존재하지 않습니다.");
      return;
    } else if (status === kakao.maps.services.Status.ERROR) {
      alert("검색 결과 중 오류가 발생했습니다.");
      return;
    }
  };

  const displayPlaces = (places) => {
    const bounds = new kakao.maps.LatLngBounds();
    removeAllChildNods(document.getElementById("placesList"));
    removeMarker();

    places.forEach((place, index) => {
      const placePosition = new kakao.maps.LatLng(place.y, place.x);
      const marker = addMarker(placePosition, index);
      bounds.extend(placePosition);

      marker.addListener("mouseover", () => {
        displayInfowindow(marker, place.place_name);
      });

      marker.addListener("mouseout", () => {
        infowindow.close();
      });

      const itemEl = (
        <li
          key={index}
          className="item"
          onMouseOver={() => displayInfowindow(marker, place.place_name)}
          onMouseOut={() => infowindow.close()}
        >
          <span className={"markerbg marker_" + (index + 1)}></span>
          <div className="info">
            <h5>{place.place_name}</h5>
            {place.road_address_name ? (
              <>
                <span>{place.road_address_name}</span>
                <span className="jibun gray">{place.address_name}</span>
              </>
            ) : (
              <span>{place.address_name}</span>
            )}
            <span className="tel">{place.phone}</span>
          </div>
        </li>
      );

      document.getElementById("placesList").appendChild(itemEl);
    });

    map.setBounds(bounds);
  };

  const addMarker = (position, idx) => {
    const imageSrc =
      "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png";
    const imageSize = new kakao.maps.Size(36, 37);
    const imgOptions = {
      spriteSize: new kakao.maps.Size(36, 691),
      spriteOrigin: new kakao.maps.Point(0, idx * 46 + 10),
      offset: new kakao.maps.Point(13, 37),
    };

    const markerImage = new kakao.maps.MarkerImage(
      imageSrc,
      imageSize,
      imgOptions
    );
    const marker = new kakao.maps.Marker({
      position: position,
      image: markerImage,
    });

    marker.setMap(map);
    setMarkers([...markers, marker]);

    return marker;
  };

  const removeMarker = () => {
    markers.forEach((marker) => {
      marker.setMap(null);
    });
    setMarkers([]);
  };

  const displayInfowindow = (marker, title) => {
    const content = '<div style="padding:5px;z-index:1;">' + title + "</div>";
    infowindow.setContent(content);
    infowindow.open(map, marker);
  };

  const displayPagination = (pagination) => {
    const paginationEl = document.getElementById("pagination");
    removeAllChildNods(paginationEl);

    for (let i = 1; i <= pagination.last; i++) {
      const el = document.createElement("a");
      el.href = "#";
      el.innerHTML = i;

      if (i === pagination.current) {
        el.className = "on";
      } else {
        el.onclick = () => pagination.gotoPage(i);
      }

      paginationEl.appendChild(el);
    }
  };

  const removeAllChildNods = (el) => {
    while (el.hasChildNodes()) {
      el.removeChild(el.lastChild);
    }
  };

  return (
    <div>
      <input
        type="text"
        id="keyword"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button onClick={searchPlaces}>검색</button>
      <div
        id="map"
        style={{ width: "100%", height: "400px" }}
        ref={mapRef}
      ></div>
      <ul id="placesList"></ul>
      <div id="pagination"></div>
    </div>
  );
};

export default Map;
