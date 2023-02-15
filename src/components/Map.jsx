const Map = () => {
  return (
    <div className="outer_map">
      <h1>Dustbin Location</h1>
      <iframe
        title="Dustbin Location"
        src="https://my.atlistmaps.com/map/eaae271e-d507-4b2c-ad64-bcf865496e46?share=true"
        allow="geolocation"
        width="100%"
        height="92%"
        scrolling="no"
        className="map"
      ></iframe>
    </div>
  );
};
export default Map;
